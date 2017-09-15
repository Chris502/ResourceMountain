select * from allTuts as t
where upper(t.tech) = upper($1)
ORDER BY datecreated DESC;