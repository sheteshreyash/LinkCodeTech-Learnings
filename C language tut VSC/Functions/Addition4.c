// Function with argument and with return type

#include <stdio.h>
#include <stdlib.h>

int adddata(int, int);
int main()
{
    
    int a, b, sum;
    printf("Enter the numbers do you want to add : \n");
    scanf("%d%d", &a, &b);
    sum = adddata(a, b);
    printf("Addition is : %d", sum);
    return 0;
}

int adddata(int n1, int n2)
{   
    int sum;
    sum = n1 + n2;
    return sum;
    
}