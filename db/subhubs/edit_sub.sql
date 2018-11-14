UPDATE subhubs
SET sh_name=$2, sh_desc=$3, sh_icon=$4, sh_banner=$5, theme_color=$6
WHERE subhub_id=$1;

SELECT * FROM subhubs
WHERE subhub_id=$1;