// C program to find the factorial of a number using while loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int i, n, result=1;
    printf("\nEnter any number : ");
    scanf("%d", &n);
    i = 2;

    while(i<=n)
    {
        result = result*i;
        i++;
    }
    printf("\nFactorial of %d is : %d", n, result);
    return 0;
}