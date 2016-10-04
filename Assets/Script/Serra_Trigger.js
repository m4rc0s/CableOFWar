#pragma strict

private var ScriptCalculo : Calc_Vel;

function Start () {
	ScriptCalculo = GameObject.FindGameObjectWithTag("Script").GetComponent(Calc_Vel); //obtem o script do calculo
}

function Update () {


}

function OnTriggerEnter2D(other : Collider2D){
	var sustenta : float = 12;
	ScriptCalculo.setVel(0);
	other.GetComponentInParent(Rigidbody2D).AddForce(Vector2.up * sustenta, ForceMode2D.Impulse);
}