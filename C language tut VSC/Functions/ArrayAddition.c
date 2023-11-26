// to display the addition of array using functions

#include <stdio.h>
#include <stdlib.h>
#define max 20

void accept(int arr[], int);
void display(int arr[], int);
void addarray(int arr[], int);

int main()
{
    int arr[max], n;
    int i;
    printf("\nHow many elements do you want in array : ");
    scanf("%d", &n);

    accept(arr, n);
    display(arr, n);
    addarray(arr, n);

    return 0;
}

void accept(int arr[], int size)
{
    int i;
    for(i=0;i<size;i++)z
    {
        printf("%5d", arr[i]);
    }

}

void display(int arr[], int)
{

}

void addarray(int arr[], int)
{

}