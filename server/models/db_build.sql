BEGIN;

DROP TABLE IF EXISTS watches, wrestbands CASCADE;

CREATE TABLE watches (
	"name" varchar NOT NULL,
	"price" int NOT NULL,
	"categories" varchar NOT NULL,
	"description" TEXT NOT NULL,
	"image_url" varchar NOT NULL,
	"id" serial NOT NULL,
	CONSTRAINT Watches_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE wrestbands (
	"name" varchar NOT NULL,
	"price" int NOT NULL,
	"image_url" varchar NOT NULL,
	"id" serial NOT NULL,
	CONSTRAINT Wrestbands_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO watches (name, price, categories, description, image_url) VALUES
('X', 20, 'Men', 'Very nice watch', 'http://www.dumaurierwatches.com/wp-content/uploads/2016/03/rebecca-turqoise-lizzard-web.jpg')
('Y', 30, 'Momen', 'Very nice watch', 'https://s7d4.scene7.com/is/image/JCPenney/DP0112201815081122M.tif?wid=350&hei=350&op_usm=.4,.8,0,0&resmode=sharp2');

INSERT INTO wrestbands(name, price, image_url) VALUES
('W', 5, 'https://images-na.ssl-images-amazon.com/images/I/81mnkOyUR2L._SX679_.jpg'),
('Z', 4, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-lhFNrS3Rwoip1ai7xxrI73d8wz--HXgeZdTz2I55S4F6SE63g');

COMMIT;
