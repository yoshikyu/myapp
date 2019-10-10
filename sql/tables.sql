create table users(
	id int auto_increment NOT NULL PRIMARY KEY,  
	name varchar(255) not null,
	email text not null,
	password text not null,
	age int not null,
	updated_at datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	created_at datetime default CURRENT_TIMESTAMP
);

create table texts(
	id int auto_increment NOT NULL PRIMARY KEY,
	text text not null,
	user_id not null,
	updated_at datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	created_at datetime default CURRENT_TIMESTAMP,
	constraint fk_user_id
		foreign key (user_id)
		references users (id)
		ON DELETE SET NULL ON UPDATE CASCADE
);