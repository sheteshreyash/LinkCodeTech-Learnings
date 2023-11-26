// C program to print the amount of times to print a statement using for loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, x;
    printf("Enter the amount of times you want to print a statement : \n");
    scanf("%d", &x);

    for(int i=0;i<x;i++) 
    {
        printf("\nHello! welcome to C programming ");
    }     
    return 0;
} 
