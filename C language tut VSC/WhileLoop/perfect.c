// C program to show whether a given number is a perfect number or not using while loop.

#include <stdio.h>
#include <stdlib.h>

int main() 
{
    int i, n, x=0;
    printf("\nEnter any number : ");
    scanf("%d", &n); //n=28=1+4+7+14

    i = 1;
    while(i<=n/2)
    {
        if(n%i==0)
        {
            x = x+i;
            x=1;
            break;
        }
        i++;
    }
    if(x==0)
    {
        printf("\nThe given number is a perfect number");    
    }
    else
    {
        printf("\nThe given number is not a perfect number");
    }
}