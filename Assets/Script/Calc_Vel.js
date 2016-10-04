#pragma strict

//variaveis globais deste script (atributos da classe)
private var coefAtrDin : float; //coeficiente de atrito dinamico
private var velocidade : float;
private var forcaRes : float; //forca resultante
private var forcaAtr : float; //forca de atrito
private var ScriptForca : Selecao_Forca; //componente do script de selecao de forca
private var massaE : float; //massa do inimigo
private var massaH : float; //massa do heroi
private var waste : float=0;

//funcao de inicializacao
function Start(){
	this.massaE = GameObject.FindGameObjectWithTag("Oponente").rigidbody2D.mass; //massa do inimigo
	this.massaH = GameObject.FindGameObjectWithTag("Heroi").rigidbody2D.mass; //massa do heroi
	this.ScriptForca = GameObject.FindGameObjectWithTag("SeleForca").GetComponent(Selecao_Forca); //script da selecao de forca
	this.velocidade = 0; //valor inicial
	//coeficiente de atrito da plataforma
	coefAtrDin = GameObject.FindGameObjectWithTag("Piso").GetComponentInChildren(BoxCollider2D).sharedMaterial.friction;
}


//funcao de atualizacao fixa (executa a cada 0.02s)
function FixedUpdate () {	
	Debug.Log("Gravidade: " + Physics2D.gravity.y);
	//this.massaE = GameObject.FindGameObjectWithTag("Oponente").GetComponent(Forca_Enemy).massaE; //massa do inimigo
	//this.massaH = GameObject.FindGameObjectWithTag("Heroi").GetComponent(Hero_force).massaH; //massa do heroi
	//aplicando forca quando apertar a barra de espaco (no script de selecao)
	if(ScriptForca.escolheu){
		
		Debug.Log("Forca: " + ScriptForca.getForcaR());
	
		//obtendo a forca resultante do script da barra de selecao de forca
		this.forcaRes = ScriptForca.getForcaR();
		if(this.forcaRes > 0){ //inimigo e mais forte desconsiderar a massa do inimigo
			
			forcaAtr = Mathf.Abs(Physics2D.gravity.y * massaH * coefAtrDin); //calcula forca de atrito
			
			if(Mathf.Abs(forcaAtr) < forcaRes){ //executa se a forca vencer o atrito
				forcaRes -= forcaAtr; //considera a acao do atrito
				this.velocidade += (forcaRes/massaH) * Time.deltaTime; //considera o atrito
			}
			
		}
		else
			if(this.forcaRes < 0){ //heroi e mais forte desconsiderar a massa do heroi
			
			Debug.Log("Velocidade: " + this.velocidade);
			
			
			forcaAtr = Mathf.Abs(Physics2D.gravity.y * massaE * coefAtrDin); //calcula forca de atrito sem sinal
			if(forcaAtr < Mathf.Abs(forcaRes)){ //executa se a forca vencer o atrito
				forcaRes += forcaAtr; //considera a acao do atrito
				this.velocidade += (forcaRes/massaE) * Time.deltaTime; //desconsidera o atrito
			}
				
		}
		if(!velocidade){ //aguarda x segundos para liberar nova selecao
			if(waste < 2){
	 			waste += Time.deltaTime;
			}
			else{
				ScriptForca.escolheu = false;
				waste = 0;
			}
			
		}
	}
	else{
		if(!ScriptForca.escolheu){
			this.velocidade = 0; //reseta a velocidade
		}
	}
	
} //fim de FixedUpdate

function aguarda(t : float){
	 var waste : float = 0;
	 while(waste < t){
	 	waste += Time.deltaTime;
	 }
}

function setVel(v : float){
	this.velocidade = v;
}

function getVel(){

	return velocidade;
}