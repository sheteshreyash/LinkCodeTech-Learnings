// C program to find whether the given number is an armstrong number or not using while loop.

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, n, r, result=0;
    printf("Enter the number you want to check : \n");
    scanf("%d", &i);
    n = i;

    while(n!=0)
    {
        r = n % 10;
        result += r*r*r;
        n/=10;
    }n++;

    if(result==i)
    {
        printf("\n%d is an Armstrong number." , i);
    }
    else
    {
        printf("\n%d is not an Armstrong number !!" , i);
    }

    return 0;
}