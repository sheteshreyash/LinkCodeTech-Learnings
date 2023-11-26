// C program to check whether the given number is an armstrong number or not using do while loop.

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, n, r, result=0;
    printf("Enter the number you want to check : \n");
    scanf("%d", &i);
    n = i;

    do
    {
        r = n % 10;
        result += r*r*r;
        n/=10;

    }while(n>0);    

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