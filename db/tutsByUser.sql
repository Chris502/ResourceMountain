select a.tech, a.link, a.ID, users.username, users.id from allTuts as a
INNER JOIN users on a.userid = users.id as UX 
where UX = $1