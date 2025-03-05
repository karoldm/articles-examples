using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MiddleColliderScript : MonoBehaviour
{
    public GameManagerScript gameManagerScript;

    // Start is called before the first frame update
    void Start()
    {
        // 
        gameManagerScript = GameObject.FindGameObjectWithTag("GameManagerTag").GetComponent<GameManagerScript>();
    }

    // Update is called once per frame
    void Update()
    {

    }
    private void OnTriggerEnter2D(Collider2D collision)
    {
        gameManagerScript.increaseScore();
    }
}
