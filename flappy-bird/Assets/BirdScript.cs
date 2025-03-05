using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BirdScript : MonoBehaviour
{
    public Rigidbody2D rigidbody2D;
    public float strength;
    public GameManagerScript gameManagerScript;
    private bool isAlive = true;

    // Start is called before the first frame update
    void Start()
    {
        gameManagerScript = GameObject.FindGameObjectWithTag("GameManagerTag").GetComponent<GameManagerScript>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && isAlive) // evita que o jogador continue jogando depois de colidir
        {
            this.rigidbody2D.velocity = Vector2.up * strength;
        }
    }

    public void OnCollisionEnter2D(Collision2D collision)
    {
        gameManagerScript.gameOver();
        isAlive = false;
    }
}
