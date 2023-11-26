// C program to find the reverse of a number using do while loop.

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n, rev=0, r, i; 
    printf("\nEnter any number : "); //123
    scanf("%d", &n);
    i = n;

    do
    {
        r = n%10;
        rev = (rev*10) + r;
        n = n/10;
    }while(n!=0);

    printf("\bReverse of no is : %d", rev);
    
    return 0;
}