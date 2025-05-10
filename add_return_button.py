
import os

# Chemin vers le dossier contenant les surah HTML
folder_path = "./"  # Change si tes fichiers sont ailleurs

# Bouton HTML à insérer
return_button_html = """
<div class="mt-10 text-center">
  <a href=\"index.html\" class=\"bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow\">
    العودة إلى الصفحة الرئيسية
  </a>
</div>
"""

# Parcours des fichiers surahX.html
for i in range(1, 115):
    filename = f"surah{i}.html"
    filepath = os.path.join(folder_path, filename)

    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()

        # Insère juste avant </body>
        if "</body>" in content:
            content = content.replace("</body>", f"{return_button_html}\n</body>")

            with open(filepath, "w", encoding="utf-8") as file:
                file.write(content)
            print(f"[✓] Bouton ajouté à {filename}")
        else:
            print(f"[!] Pas de </body> dans {filename}, ignoré.")
    else:
        print(f"[!] Fichier introuvable : {filename}")
