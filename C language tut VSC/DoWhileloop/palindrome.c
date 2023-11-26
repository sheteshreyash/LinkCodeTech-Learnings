// C program to find whether the given number is a palindrome number or not using do while loop.

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int n, i, r, temp, rev=0;
    printf("\nEnter any number : ");
    scanf("%d", &n); //n= 121
    i = n;

    do    
    {
        r = n%10;  //121%10=1
        n = n/10;  //121/10=12
        rev = (rev*10) + r; //0*10+1=1        
    } while(n>0);
    
    printf("\bReverse of no is : %d", rev);

    if(i==rev)
    {
        printf("\n%d number is a palindrome number", i);
    }
    else
    {
        printf("\n%d number is not a palindrome number", i);
    }
    return 0;
}