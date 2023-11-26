// C program to print the reverse of a number using while loop.

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n, i, r, sum=0;
    printf("\nEnter any number : ");
    scanf("%d", &n);

    i =1;
    while(n!=0)
    {
        r = n%10;
        n = n/10;
        printf("%d", r);
    }
    return 0;
}