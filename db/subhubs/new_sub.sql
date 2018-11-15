INSERT INTO subhubs (sh_name, sh_desc, sh_icon, sh_banner, theme_color)
VALUES ($1, $2, $3, $4, $5);

SELECT * FROM subhubs
WHERE sh_name = $1;