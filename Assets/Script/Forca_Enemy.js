#pragma strict

//variaveis globais deste script (atributos da classe)
var forcaE : float; //forca maxima do inimigo
var massaE : float; //massa do inimigo
private var ScriptForca : Selecao_Forca; //componente do script de selecao de forca
private var ScriptCalculo : Calc_Vel; //componente do script de calculos
private var forcaEfetiva : float; //forca que sera realizada pelo inimigo

//funcao de inicializacao
function Start () {
	forcaE = 10.5; //forca maxima do inimigo
	massaE = 2; //salva a massa do inimigo
	ScriptForca = GameObject.FindGameObjectWithTag("SeleForca").GetComponent(Selecao_Forca); //obtem o script da forca
	ScriptCalculo = GameObject.FindGameObjectWithTag("Script").GetComponent(Calc_Vel); //obtem o script do calculo
	//atualiza a massa do personagem na unity
	this.rigidbody2D.mass = massaE;
}

//funcao de atualizacao variavel (executa a cada frame)
function Update(){
	//aplicando forca quando apertar a barra de espaco (no script de selecao)
	if(ScriptForca.escolheu){
		this.rigidbody2D.velocity = Vector2(ScriptCalculo.getVel(),this.rigidbody2D.velocity.y); //aplicando a velocidade ao personagem
	}
	//condicao de derrota
	if(transform.position.y < -10){
		this.transform.position = Vector2(4,0);
	}

}