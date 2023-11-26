// Function without argument and with return type

int adddata();

#include <stdio.h>
#include <stdlib.h>

int main()
{
    int sum;
    sum = adddata();
    printf("Addition is : %d", sum);
    return 0;
}

int adddata()
{   
    int a, b, sum;
    printf("Enter the numbers do you want to add : \n");
    scanf("%d%d", &a, &b);
    sum = a + b;
    return sum;
    
}
