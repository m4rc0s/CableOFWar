#pragma strict

//variaveis globais deste script (atributos da classe)
var forcaH : float; //forca maxima do heroi
var massaH : float; //massa do heroi
private var ScriptForca : Selecao_Forca; //componente do script de selecao de forca
private var ScriptCalculo : Calc_Vel; //componente do script de calculos
private var forcaEfetiva : float; //forca que sera realizada pelo heroi

//funcao de inicializacao
function Start(){
	//obtendo o componente script da barra de forca
	forcaH = 10; //define a forca do heroi
	massaH = 1; //define a massa do heroi
	ScriptForca = GameObject.FindGameObjectWithTag("SeleForca").GetComponent(Selecao_Forca); //obtem o script da forca
	ScriptCalculo = GameObject.FindGameObjectWithTag("Script").GetComponent(Calc_Vel); //obtem o script do calculo
	//atualiza a massa do personagem na unity
	this.rigidbody2D.mass = massaH;
}


//funcao de atualizacao variavel (executa a cada frame)
function Update () {

	//*** Remover na versao final *******
	var vel : int = 2; //para animacao de deslocamento - com setas
	if(Input.GetAxisRaw("Horizontal") > 0){
	
		this.transform.Translate(Vector2.right * vel * Time.deltaTime);
	}
	if(Input.GetAxisRaw("Horizontal") < 0){
	
		this.transform.Translate(-Vector2.right * vel * Time.deltaTime);
	}
	if(Input.GetKeyDown(KeyCode.UpArrow)){
	
		this.transform.Translate(-Vector2.up * ScriptForca.getForcaR() * Time.deltaTime);
	}
	//*****************/
	
	//aplicando forca quando apertar a barra de espaco (no script de selecao)
	if(GameObject.FindGameObjectWithTag("SeleForca").GetComponent(Selecao_Forca).escolheu){
			this.rigidbody2D.velocity = Vector2(ScriptCalculo.getVel(),this.rigidbody2D.velocity.y); //aplicando a velocidade ao personagem
	}
	
	//retirar esse bloco
	if(Input.GetKeyDown(KeyCode.UpArrow)){
		if(ScriptForca.getForcaR()>0){
			this.transform.Translate(Vector2.up * ScriptForca.getForcaR());
		}
		else{
			this.transform.Translate(-Vector2.up * ScriptForca.getForcaR());
		}
	}
	
	//condicao de derrota
	if(transform.position.y < -10){
		this.transform.position = Vector2(-4,0);
	}
} //fim de Update