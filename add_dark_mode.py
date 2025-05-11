
import os

# Chemin vers ton dossier contenant les fichiers surahX.html
directory = "."  # "." = dossier actuel, change-le si nécessaire

dark_mode_script = """
<style>
  .dark-mode {
    background-color: #1a202c;
    color: white;
  }
</style>
<button onclick="document.body.classList.toggle('dark-mode')" style="position:fixed;top:10px;left:10px;z-index:1000;background:#eee;padding:5px 10px;border-radius:5px;">
  🌙 Mode sombre
</button>
"""

for i in range(1, 115):
    filename = f"surah{i}.html"
    filepath = os.path.join(directory, filename)

    if not os.path.exists(filepath):
        print(f"❌ Le fichier {filename} n'existe pas.")
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Ne pas injecter deux fois
    if "dark-mode" in content:
        print(f"✔️  Mode sombre déjà présent dans {filename}")
        continue

    # Injecter juste après <body>
    if "<body" in content:
        parts = content.split("<body", 1)
        body_tag_split = parts[1].split(">", 1)
        before = parts[0] + "<body" + body_tag_split[0] + ">"
        after = dark_mode_script + body_tag_split[1]
        new_content = before + after

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)

        print(f"✅ Mode sombre ajouté dans {filename}")
    else:
        print(f"⚠️ Pas de balise <body> trouvée dans {filename}")
