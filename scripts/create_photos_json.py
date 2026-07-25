from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive
import json

# 1. Authentification
gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

# 2. ID du dossier Drive
folder_id = "1CzNRa7JQYDhOsd2vG4ddOrvECJY0LpPB"   # <-- remplace par ton dossier

# 3. Récupération des fichiers
query = f"'{folder_id}' in parents and trashed=false"
file_list = drive.ListFile({'q': query}).GetList()

# 4. Extraction des IDs
photo_ids = [file['id'] for file in file_list]

# 5. Génération du JSON
json_data = {"photos": photo_ids}

with open("photos.json", "w") as f:
    json.dump(json_data, f, indent=4)

print(f"✔️ Fichier photos.json généré avec {len(photo_ids)} photos.")
