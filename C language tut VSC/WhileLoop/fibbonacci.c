// C program to show the full fibonacci series of numbers using while loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, j, k, l, temp=0;
    int cnt = 1;
    i = 0;
    j = 1;
    
    printf("\nEnter length of the fibonacci series do you want : ");
    scanf("%d", &l);

    printf(i, j);

    for(i=3;i<=l;i++)
    {
        temp = i + j;
        printf(temp);
        j = i;
        
    }
    
}