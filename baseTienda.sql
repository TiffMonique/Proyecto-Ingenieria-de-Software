create database tienda;
use tienda;

create table Roles(
					idRol int primary key, 
                    nombre varchar(50) not null, 
                    permisos varchar(100));

create table Usuarios(
					idUsuarios int primary key auto_increment, 
                    nombre varchar(60) not null, 
                    apellido varchar(60) not null, 
                    correo varchar(120) not null unique, 
                    telefono varchar(20) not null, 
                    pass varchar(150) not null, 
                    direccion varchar(250), 
                    idRol int not null, 
                    foreign key(idRol) references Roles(idRol));
       
create table Denuncias(
					idDenuncia int primary key auto_increment,
                    idUsuario int not null,
                    contenido varchar(255) not null,
                    fechaHora datetime not null,
                    denunciado int not null,
                    estado bool not null,
                    foreign key(idUsuario) references Usuarios(idUsuarios));
                    
                    

create table Venta(
					idVenta bigint primary key auto_increment,
                    idUsuario int not null,
                    estado bool not null,
                    calificacion int1,
                    foreign key(idUsuario) references Usuarios(idUsuarios));

create table Anuncios(
					idAnncio bigint primary key auto_increment,
                    idVenta bigint not null,
                    fechaInicio datetime not null,
                    fechaFin datetime not null,
                    descripcion varchar(1000),
                    foreign key(idVenta) references Venta(idVenta));
                    
create table Categorias(
					idCategoria int primary key,
                    nombre varchar(50) not null,
                    descripcion varchar(255));
                    
create table Suscripciones(
					idSuscripcion bigint primary key auto_increment,
                    idUsuario int not null,
                    idCategoria int not null,
                    fecha datetime not null,
                    foreign key(idUsuario) references Usuarios(idUsuarios),
                    foreign key(idCategoria) references Categorias(idCategoria));
                    
create table Ubicaciones(
					idUbicacion int primary key,
                    nombreDepto varchar(20) not null,
                    direccion varchar(1000) not null);
                    
                    
             
                    
              
create table DetalleVenta(
					idDetalleVenta int primary key auto_increment,
                    idVenta bigint not null,
                    producto varchar(100) not null,
                    cantidad int not null,
                    descripcion varchar(1000),
                    categoria int not null,
                    precio float not null,
                    fechaPublicacion date not null,
                    ubicacion int not null,
                    
                    foreign key(idVenta) references Venta(idVenta),
                    foreign key(categoria) references Categorias(idCategoria),
                    foreign key(ubicacion) references Ubicaciones(idUbicacion));
                    
                    
                    