// to display array using functions....

#include <stdio.h>
#include <stdlib.h>

void display(int arr[], int);

int main()
{
    int arr[5] = {10, 20, 30, 40, 60};
    int i;
    display(arr, 5);

    return 0;
}
void display(int arr[], int size)
{
    int i;
    for(i=0;i<size;i++)
    {
        printf("\n%5d", arr[i]);
    }
}