using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PipeSpanewrScript : MonoBehaviour
{
    public GameObject pipePrefab;
    public float spawnTime = 2f;
    private float timer = 0;
    public float heightOffset = 10f;
    public float deadZone = -80f;

    // Start is called before the first frame update
    void Start()
    {
        spawnPipe();
    }

    // Update is called once per frame
    void Update()
    {
        if(timer < spawnTime)
        {
            timer += Time.deltaTime;
        }
        else
        {
            spawnPipe();
            timer = 0;
        }

        if(transform.position.x < deadZone)
        {
            Destroy(gameObject);
        }
    }

    private void spawnPipe()
    {
        float highestPoint = transform.position.y + heightOffset;
        float lowestPoint = transform.position.y - heightOffset;
        float y = Random.Range(lowestPoint, highestPoint);

        Instantiate(pipePrefab, new Vector3(transform.position.x, y, transform.position.z), transform.rotation);
    }
}
