for (package in c("googledrive", "jsonlite")) {
  if (!requireNamespace(package, quietly = TRUE)) install.packages(package)
}

library(googledrive)
library(jsonlite)

# drive auth
# drive_auth()

photos_dir_id <- "1kiKD9TkbDmoqBP7m1haBSeqDTNwB-Fzr"

files <- drive_ls(as_id(photos_dir_id))

photo_ids <- files$id

json_data <- list(photos = photo_ids)

write_json(json_data, "photos.json", pretty = TRUE, auto_unbox = TRUE)

cat("✔️ Fichier photos.json généré avec", length(photo_ids), "photos.\n")
