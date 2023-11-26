// C program to identify whether the given number is a prime number or not using while loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, n, x=0;
    printf("\nEnter any number : ");
    scanf("%d", &n);

    i = 2;
    while(i<=n/2)
    {
        if(n%i==0)
        {
            x=1;
            break;
        }
        i++;
    }
    if(x==0)
    {
        printf("\n%d number is prime number", n);    
    }
    else
    {
        printf("\n%d number is not a prime number", n);
    }
    return 0;
}