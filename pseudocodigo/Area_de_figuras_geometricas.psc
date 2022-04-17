SubProceso area <- area_circulo(radio)
    area = PI * radio;
FinSubProceso

SubProceso area <- area_triangulo (base,altura)
    area = (base * altura)/2;
FinSubProceso

SubProceso area <- area_cuadrado (lado)
    area = lado * lado;
FinSubProceso

SubProceso area <- area_rectangulo (base,altura)
    area = base * altura;
FinSubProceso

SubProceso area <- area_rombo (diagonalMayor,diagonalMenor)
    area = (diagonalMayor * diagonalMenor)/2;
FinSubProceso

Proceso  Area_de_figuras_geometricas
	Definir respuesta Como Entero;
    Escribir 'Calcula el área de una figura geométrica';
	
	Escribir '¿Usted desea calcular el area de una figura geométrica? Sí (1) No (2)';
	Leer respuesta;
	
	Mientras  respuesta == 1 Hacer
		Escribir 'Elige una figura';
		
		Escribir 'Círculo (1), Triángulo (2), Cuadrado (3), Rectángulo (4), Rombo (5)';
		
		Leer valor;
		
		Segun valor Hacer
			1:
				Escribir 'Ingrese radio';
				Leer radio;
				Escribir 'Es area de la figura es: ',area_circulo(radio);
			2:
				Escribir 'Ingrese base';
				Leer base;
				Escribir 'Ingrese altura';
				Leer altura;
				Escribir 'Es area de la figura es: ',area_triangulo(base,altura);
			3:
				Escribir 'Ingrese lado';
				Leer lado;
				Escribir 'Es area de la figura es: ',area_cuadrado(lado);
			4:
				Escribir 'Ingrese base';
				Leer base;
				Escribir 'Ingrese altura';
				Leer altura;
				Escribir 'Es area de la figura es: ',area_rectangulo(base, altura);
			5:
				Escribir 'Ingrese diagonal mayor';
				Leer diagonal_mayor;
				Escribir 'Ingrese diagonal menor';
				Leer diagonal_menor;
				Escribir 'Es area de la figura es: ',area_rombo(diagonal_mayor,diagonal_menor);
				
			De Otro Modo:
				Escribir 'La opción ingresada no existe';
				
		Fin Segun
		Escribir '¿Usted desea calcular el area de una figura geométrica? Sí (1) No (2)';
		Leer respuesta;
	FinMientras
FinProceso