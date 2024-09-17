select country from world_food 
where country like 'U' || '%';		-- to find the country starting with the letter U

select country from world_food 
where country like '%' || 'a';		-- to find the country ending with the letter a