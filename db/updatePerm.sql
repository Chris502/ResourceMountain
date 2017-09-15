UPDATE users
set permission = $1
where id = $2

select * from users