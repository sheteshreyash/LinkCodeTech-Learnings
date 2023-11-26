#include <stdio.h>
#include <stdlib.h>

int main()
{
    int n=10;
    int *ptr=&n;  //Address of n store in ptr variable
    printf("\nValue of n is : %d" , n);
    printf("\nAddress of n is : %u\n", &n);

    printf("\nData using pointer\n");
    printf("\nValue of n using pointer is : %d" , *ptr); //n
    printf("\nAddress of n using pointer is : %u" , ptr);

    return 0;
}