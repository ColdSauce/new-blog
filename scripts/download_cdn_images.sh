set -eo pipefail

ROOT_IMG_DIR='/Users/coldsauce/stefanaleksic/migrated/public/static/images'
while read -r line ; do
    NAME="public/static/images/"$(sed -E 's/^.+\*//' <<< $line)
    if [ -f $NAME ];
    then
        echo "skipping"
    else
        curl $line > $NAME
    fi
done < <(grep -Eho "https:\/\/cdn\-images.+?png" . -r)


grep -rl "cdn-images" data/blog | xargs gsed -ir 's/https.+\*//'
# $(sed -E 's/^.+\*//' <<< $line)
