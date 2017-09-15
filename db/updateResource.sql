UPDATE allTuts 
set linkdesc = $1
where id = $2;

select * from allTuts