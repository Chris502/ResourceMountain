select * from allTuts
where UPPER(linkdesc) like ('%' || UPPER($1) || '%')