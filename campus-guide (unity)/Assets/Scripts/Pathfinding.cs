using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class Pathfinding : MonoBehaviour
{
    public NavMeshAgent agent;
    public Transform destinationTag;

    void Start() {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.P)) {
            agent.SetDestination(destinationTag.position);
        }
    }
}
