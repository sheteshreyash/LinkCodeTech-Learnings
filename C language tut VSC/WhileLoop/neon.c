// C program to find whether the given number is a neon number or not using while loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n, i, r, sum=0;

    printf("\nEnter any number : ");
    scanf("%d", &n);

    i = n*n;

    while(i!=0)
    {
        r = i%10;
        sum = r + sum;
        i = i/10;
    }
    if(sum==n)
    {
        printf("%d is a neon number", n);
    }
    else
    {
        printf("%d is not a neon number", n);
    }
    return 0;
}