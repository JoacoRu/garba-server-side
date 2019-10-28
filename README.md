# garba-server-side

- Conociendo la app

1) Basicamente la app funciona de la siguiente forma. Desde el controller manejamos el request, el controller le pega al servicio.
En el servicio es donde esta la logica de cada metodo, el servicio segun lo necesite o se comunica con la base de datos o hace
un fetch pidiendo lo que corresponda segun el metodo.

2) En ./config/index.js esta el configuracion de toda la app, es decir, ahi es donde configuramos los datos de la base de datos y
los datos de la app. No esta configurada para levantar con ENV, por lo tanto todos los datos van en el config.

- Levantando la app

1) Antes de levantar la app ejecutar el comando "npm run state", este comando realiza un fetch pidiendo todos los productos y
luego teniendo el id de cada producto, recorre el objeto devuelto y guarda en la base de datos mongo si el producto esta "enabled".
Si es necesario se puede ver el modelo en ./model/enabled.model.js . Esto se hace para emular que los datos 
"Ya estan cargados desde antes". De esta forma podemos realizar nuestro metodo por "PATCH" y persistir los datos.

2) Luego de haber realizado el paso nro 1, podemos levantar la app. Para levantar la app hay que ejecutar el comando 
"npm run serve". Tener en cuenta que este comando utiliza nodemoon, si no esta instalado, ejecutar el comando 
"npm run serve-node".


-Endpoints

Basicamente la app tiene 3 endpoints

1)GET - /products -> Devuelve el listado de productos,

2)GET - /products/:id -> Devuelve un producto segun una determinada id. Si ese producto tiene el campo "enabled: false", el response va a ser un 404 not found

3)PATCH -  /products/:id -> Modifica un producto segun una determinada id. En el body pasaremos "Enabled: True/False", segun se requiera.
El mismo retornara, si la llamada fue exitosa, el objeto actualizado.
