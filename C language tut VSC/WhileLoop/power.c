// C program to take base and power and calculate arithmetic operations using while loop

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int b, p, i, result=1;
    printf("\nEnter the base and power : ");
    scanf("%d%d", &b, &p);

    i = 1;
    while(i<=p)
    {
        result = result*b;
        i++;
    }
    printf("\nAnswer for base %d power %d = %d", b, p, result);
    return 0;
}