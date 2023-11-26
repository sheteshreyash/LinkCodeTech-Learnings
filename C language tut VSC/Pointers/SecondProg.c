#include <stdio.h>
#include <stdlib.h>
                          //doubt in the progg
int main()
{
    int n;
    int *ptr=&n;  //Address of n store in ptr variable
    int **ptr1=&ptr; // Address of ptr in ptr2 variable

    printf("Enter any number : \n");
    scanf("%d", &n);

    printf("\nValue of n is : %d" , n);
    printf("\nAddress of n is : %u\n", &n);

    printf("\nData using pointer : ");
    printf("\nValue of n using pointer is : %d" , *ptr); //n
    printf("\nAddress of n using pointer is : %u\n" , ptr);
    
    printf("\nData using pointer1 : ");
    printf("\nValue of n using pointer1 is : %d" , **ptr1); //n
    printf("\nAddress of n using pointer1 is : %u" , *ptr1);
    printf("\nAddress of ptr using ptr1 is : %u", ptr1);
    printf("\nAddress of ptr1 is : %u", &ptr1);

    return 0;
}