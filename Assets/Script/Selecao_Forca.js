#pragma strict

var GuiOn = false;

//forca maxima a ser aplicada - depende do personagem
var enemyForce : float; //forca maxima do inimigo
var heroForce : float; //forca maxima do heroi

//create a boolean flag we can use to stop and start the choosing of power
var escolheu : boolean = false;
var compBarra : int = 3; // metade do comprimento da barra
var velocidade : float = 0.03; //pode variar ate 0.8
//cria variaveis privadas (nao mostradas no inspector) para armazenar a forca efetiva
// e as animacoes da barra de forca
private var forcaAplicH : float; //forca efetiva aplicada do heroi
private var forcaAplicE : float; //forca efetiva aplicada do inimigo
private var forcaResult : float; //forca resultante
private var lado : int = 1; //determina o lado da animacao
private var selecao : boolean = true; //variavel auxiliar da animacao
private var seletor : GameObject; //ponteiro seletor da forca

private var step : float = 0.0;

function Start ()
{
	
	if ( Time.timeScale == 0 ) {
		
		Time.timeScale = 1;
	
	} 

	
	seletor = GameObject.Find("Ponteiro"); //acessa o objeto ponteiro
	//obtendo o valor da forca do player (do script do player - Hero_force)
	heroForce = GameObject.FindGameObjectWithTag("Heroi").GetComponent(Hero_force).forcaH;
	
	//obtendo a forca maxima do inimigo a partir do objeto que contem o script
	enemyForce = GameObject.FindGameObjectWithTag("Oponente").GetComponent(Forca_Enemy).forcaE;
	
}

function ctrlState(flag : boolean){
	
	GuiOn = flag;
    escolheu = flag;
    Time.timeScale = flag ? 0 : 1 ;

}

function OnGUI(){

	var dialogX  = (Screen.width/2) - 140;
	var dialogY = (Screen.height/2) - 45;
	
	var btnYesX = dialogX + 100;
	var btnYesY = dialogY + 30;
	
	var btnNoX = dialogX + 100;
	var btnNoY = dialogY + 50;
	//var btnNoY = dialogY;

	
	if(GuiOn){
	
		GUI.Box(Rect(dialogX, dialogY,280,90),"Voltar para o menu princial?");
		
	  
    	if (GUI.Button (Rect (btnYesX,btnYesY,80,20), "Sim")) {
    		
    		Application.LoadLevel('Main_Menu');
    		
    		//Application.Quit();
		
		}
		
		if (GUI.Button (Rect (btnNoX,btnNoY,80,20), "Nao")) {
           	ctrlState(false);
        }
  	}

}

function Update () {

	if( Input.GetKeyDown ( KeyCode.Escape ) ) { 
	
		if(!GuiOn){
		
			ctrlState(true);

		}else{

			ctrlState(false);
		
		}
	
		//Application.LoadLevel ( 'Main_Menu' ) ;
	
	}
	
	if ( GuiOn && Input.GetKeyDown ( KeyCode.Return ) ) {
		
		Application.LoadLevel('Main_Menu');
	
	}
	
	
	
	// detecta se a barra de espaco foi solta e altera a flag escolheu para true
	if(Input.GetButtonUp("Jump")){
		escolheu = true;
		
	}
	
	//animacao da barra de forca
	if(!escolheu){
		//variavel da forca varia de 0 a 1, atravez da funcao pingpong
		//determina a porcentagem da forca total
		forcaAplicH = Mathf.PingPong(step, 1); //retorna um numero entre 0 e 1
		step += velocidade;
		//animacao do ponteiro da barra
		if((forcaAplicH < velocidade)&&(selecao)){ //serve para suavizar a mudanca de direcao do ponteiro
			lado *= (-1);
			selecao = false;
		}
		if((forcaAplicH > 0.5)){ //habilita a mudanca de lado do ponteiro
			selecao = true;
		}
		//atualiza a posicao do ponteiro da barra, limitando no comprimento da barra
		seletor.transform.position.x = forcaAplicH * lado * compBarra;
		
		//atribui o valor da forca a ser aplicada
		forcaAplicH = (forcaAplicH - 1) * heroForce; //a forca sera sempre para a esquerda (heroi)
		forcaAplicE = Random.value * enemyForce;//gera forca aleatoria sempre para a direita (inimigo)

	}
	//retirar na versao final
	else {
		if(escolheu && Input.GetButtonDown("Jump")){
			escolheu = false;
		}
	}
}

//retorna a forca resultante
function getForcaR(){
	forcaResult = (forcaAplicH + forcaAplicE);
	return forcaResult;
}
