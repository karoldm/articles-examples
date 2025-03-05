using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using UnityEngine.SceneManagement;

public class GameManagerScript : MonoBehaviour
{
    private int score;
    public TextMeshProUGUI scoreText;
    public GameObject gameOverScreen;

    [ContextMenu("increase Score")]
    public void increaseScore()
    {
        this.score++;
        scoreText.text = this.score.ToString();
    }

    public void gameOver()
    {
        // tornamos visivel a tela de gameOver
        gameOverScreen.SetActive(true);
    }

    public void gameAgain()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
