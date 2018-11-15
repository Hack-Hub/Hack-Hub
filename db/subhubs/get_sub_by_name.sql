SELECT * FROM subhubs
WHERE LOWER(sh_name) LIKE '%' || LOWER($1) || '%'