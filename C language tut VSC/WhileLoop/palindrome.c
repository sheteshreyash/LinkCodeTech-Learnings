// C program to find the reverse of a number and to check whether it is a palindrome or not using while loop.

#include <stdio.h>
#include <stdlib.h>
int main()
{
    int n, i, r, temp, cnt=0, rev=0;
    printf("\nEnter any number : ");
    scanf("%d", &n); //n= 121
    i = n;

    while(n!=0) //121!=0 
    {
        r = n%10;  //121%10=1
        n = n/10;  //121/10=12
        rev = (rev*10) + r; //0*10+1=1        
    }
    printf("\bReverse of no is : %d", rev);

    if(i==rev)
    {
        printf("\n%d number is a palindrome number");
    }
    else
    {
        printf("\n%d number is not a palindrome number");
    }
    return 0;
}