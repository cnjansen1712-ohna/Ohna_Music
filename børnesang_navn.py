#!/usr/bin/env python3
"""
Børnesange-app: Erstatter ALLE forekomster af "Noah" i en sang med et valgfrit navn.

Sangene er master-indspilninger med "Noah". Et timestamps-JSON-kort fortæller
præcis hvornår (og hvor længe) Noah udtales i hver sang. Scriptet:
  1. Genererer det nye navn som lyd via ElevenLabs
  2. Indlæser sangen og erstatter HVER forekomst af "Noah" med det nye navn
  3. Gemmer resultatet som ny MP3

Krav:
    pip install requests pydub
    ffmpeg installeret  (brew install ffmpeg  /  sudo apt install ffmpeg)

── Timestamps-fil ────────────────────────────────────────────────────────────
Opret en fil ved siden af sangene: timestamps.json
Format:
{
  "god-morgen.mp3":   [{"start": 8.1, "slut": 8.9}, {"start": 22.4, "slut": 23.2}],
  "god-nat.mp3":      [{"start": 5.0, "slut": 5.7}],
  "tillykke.mp3":     [{"start": 3.2, "slut": 4.0}, {"start": 14.5, "slut": 15.3}]
}
"start" og "slut" er i sekunder og angiver præcis hvor Noah udtales.

── Brug ──────────────────────────────────────────────────────────────────────
  python børnesang_navn.py --navn Sofie --sang god-morgen.mp3
  python børnesang_navn.py --navn Sofie --sang god-morgen.mp3 --output sofie-morgen.mp3
  python børnesang_navn.py --navn Sofie --alle --mappe ./sange   # behandl alle sange
"""

import argparse
import json
import os
import sys
import tempfile
import requests
from pydub import AudioSegment


# ── Konfiguration ──────────────────────────────────────────────────────────────

ELEVENLABS_API_KEY  = "DIN_API_NØGLE_HER"    # ← indsæt din ElevenLabs API-nøgle
VOICE_ID            = "DIN_VOICE_ID_HER"      # ← indsæt din ElevenLabs Voice ID
TIMESTAMPS_FIL      = "timestamps.json"        # sti til timestamps-filen
CROSSFADE_MS        = 60                       # blød overgang i ms (0 = ingen)


# ── ElevenLabs ─────────────────────────────────────────────────────────────────

def generer_navn_lyd(navn: str, api_key: str, voice_id: str) -> AudioSegment:
    """Kalder ElevenLabs og returnerer navnet som AudioSegment."""
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
    }
    payload = {
        "text": navn,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.8},
    }

    print(f"  → Genererer '{navn}' via ElevenLabs ...")
    r = requests.post(url, json=payload, headers=headers, timeout=30)

    if r.status_code != 200:
        print(f"  ✗ ElevenLabs fejl {r.status_code}: {r.text}")
        sys.exit(1)

    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
        tmp.write(r.content)
        tmp_sti = tmp.name

    try:
        segment = AudioSegment.from_mp3(tmp_sti)
    finally:
        os.remove(tmp_sti)

    print(f"  ✓ Navn-lyd klar ({len(segment)/1000:.2f} sek)")
    return segment


# ── Erstat alle Noah-forekomster ───────────────────────────────────────────────

def erstat_navn_i_sang(
    sang_sti: str,
    forekomster: list[dict],
    nyt_navn_lyd: AudioSegment,
    output_sti: str,
    crossfade_ms: int = CROSSFADE_MS,
):
    """
    Erstatter ALLE forekomster af "Noah" i sangen med nyt_navn_lyd.

    forekomster: liste af {"start": float, "slut": float}  (sekunder)
    Forekomsterne behøver ikke have samme varighed — det nye navn skaleres
    til at passe i samme tidsrum, eller sangen justeres hvis navnet er kortere.
    """
    print(f"  → Indlæser: {sang_sti}")
    sang = AudioSegment.from_mp3(sang_sti)
    sang_ms = len(sang)

    # Sorter forekomster kronologisk
    sorterede = sorted(forekomster, key=lambda f: f["start"])

    print(f"     {len(sorterede)} forekomst(er) af 'Noah' skal erstattes")

    resultat = AudioSegment.empty()
    forrige_slut_ms = 0

    for i, f in enumerate(sorterede, 1):
        start_ms = int(f["start"] * 1000)
        slut_ms  = int(f["slut"]  * 1000)
        noah_varighed_ms = slut_ms - start_ms

        print(f"     [{i}] {f['start']:.2f}s → {f['slut']:.2f}s  "
              f"(Noah = {noah_varighed_ms} ms, nyt navn = {len(nyt_navn_lyd)} ms)")

        # Tilføj sang-segment frem til denne forekomst
        del_før = sang[forrige_slut_ms:start_ms]

        # Tilpas nyt navn til Noah's varighed i sangen:
        #   - Er det nye navn kortere → speed-match (lille pitch-ændring)
        #   - Er det kortere end 200 ms forskel → behold original længde
        navn_til_brug = tilpas_varighed(nyt_navn_lyd, noah_varighed_ms)

        # Match lydniveau til omgivende sang
        reference_db = sang[start_ms:slut_ms].dBFS
        if reference_db != float("-inf"):
            navn_til_brug = navn_til_brug.apply_gain(reference_db - navn_til_brug.dBFS)

        # Sammensæt med crossfade
        if crossfade_ms > 0 and len(del_før) >= crossfade_ms:
            resultat = resultat + del_før
            # Blød indgang til navnelyden
            navn_fade = navn_til_brug.fade_in(crossfade_ms).fade_out(crossfade_ms)
            resultat = resultat + navn_fade
        else:
            resultat = resultat + del_før + navn_til_brug

        forrige_slut_ms = slut_ms

    # Tilføj resten af sangen efter sidste forekomst
    resultat = resultat + sang[forrige_slut_ms:]

    print(f"  → Gemmer: {output_sti}  ({len(resultat)/1000:.1f} sek)")
    resultat.export(output_sti, format="mp3", bitrate="192k")
    print(f"  ✓ Gemt!\n")


def tilpas_varighed(segment: AudioSegment, mål_ms: int) -> AudioSegment:
    """
    Forsøger at tilpasse segmentets varighed til mål_ms via speedup/slowdown.
    Hvis forskellen er under 300 ms ignoreres det (undgå unødig pitch-ændring).
    """
    forskel = abs(len(segment) - mål_ms)
    if forskel < 300:
        return segment  # tæt nok — ingen ændring

    # pydub har ikke native time-stretch; vi bruger frame_rate-trick
    # (lille pitch-ændring, men umærkeligt for et enkelt navn)
    faktor = len(segment) / mål_ms          # > 1 → skal gøres hurtigere
    nyt_frame_rate = int(segment.frame_rate * faktor)
    hurtig = segment._spawn(segment.raw_data, overrides={"frame_rate": nyt_frame_rate})
    return hurtig.set_frame_rate(segment.frame_rate)


# ── Indlæs timestamps ──────────────────────────────────────────────────────────

def indlæs_timestamps(timestamps_sti: str) -> dict:
    if not os.path.isfile(timestamps_sti):
        print(f"✗ Timestamps-fil ikke fundet: {timestamps_sti}")
        print("  Opret filen med følgende format:")
        print('  { "sang.mp3": [{"start": 8.1, "slut": 8.9}] }')
        sys.exit(1)
    with open(timestamps_sti, encoding="utf-8") as f:
        return json.load(f)


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Erstat 'Noah' med et valgfrit navn i børnesange-MP3'er."
    )
    parser.add_argument("--navn",       required=True,  help="Det nye navn, f.eks. Sofie")
    parser.add_argument("--sang",       default=None,   help="Én sang-fil, f.eks. god-morgen.mp3")
    parser.add_argument("--alle",       action="store_true", help="Behandl alle sange i timestamps-filen")
    parser.add_argument("--mappe",      default=".",    help="Mappe med sang-filer (bruges med --alle)")
    parser.add_argument("--output",     default=None,   help="Output-filnavn (kun ved --sang)")
    parser.add_argument("--timestamps", default=TIMESTAMPS_FIL, help="Sti til timestamps.json")
    parser.add_argument("--api-key",    default=ELEVENLABS_API_KEY)
    parser.add_argument("--voice-id",   default=VOICE_ID)
    args = parser.parse_args()

    # Valider nøgler
    if args.api_key == "DIN_API_NØGLE_HER":
        print("✗ Sæt din ElevenLabs API-nøgle (--api-key eller øverst i scriptet)")
        sys.exit(1)
    if args.voice_id == "DIN_VOICE_ID_HER":
        print("✗ Sæt din ElevenLabs Voice ID (--voice-id eller øverst i scriptet)")
        sys.exit(1)
    if not args.sang and not args.alle:
        print("✗ Angiv enten --sang <fil> eller --alle")
        sys.exit(1)

    timestamps = indlæs_timestamps(args.timestamps)

    print(f"\n🎵 Børnesange-app — erstatter 'Noah' med '{args.navn}'")
    print("─" * 55)

    # Generer det nye navn ÉN gang — bruges til alle sange
    nyt_navn_lyd = generer_navn_lyd(args.navn, args.api_key, args.voice_id)

    if args.sang:
        # Én enkelt sang
        sang_key = os.path.basename(args.sang)
        if sang_key not in timestamps:
            print(f"✗ '{sang_key}' findes ikke i timestamps-filen.")
            print(f"  Tilgængelige sange: {', '.join(timestamps.keys())}")
            sys.exit(1)

        output = args.output or f"{os.path.splitext(args.sang)[0]}_{args.navn}.mp3"
        erstat_navn_i_sang(args.sang, timestamps[sang_key], nyt_navn_lyd, output)

    else:
        # Alle sange i timestamps-filen
        for sang_fil, forekomster in timestamps.items():
            sti = os.path.join(args.mappe, sang_fil)
            if not os.path.isfile(sti):
                print(f"  ⚠ Springer over (fil ikke fundet): {sti}")
                continue
            base, ext = os.path.splitext(sti)
            output = f"{base}_{args.navn}{ext}"
            erstat_navn_i_sang(sti, forekomster, nyt_navn_lyd, output)

    print("─" * 55)
    print(f"✅ Alle sange behandlet for '{args.navn}'!\n")


if __name__ == "__main__":
    main()
