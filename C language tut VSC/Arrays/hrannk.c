#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>
#define max 20

int main() {
    int i, n, sum=0;
    int arr[max];
    
    printf("Enter any elements : \n");
    scanf("%d", &n);
    for(i=0;i<n;i++){
        scanf("%d", &arr[i]);
    }
    for(i=0;i<n;i++){
        printf("%d ", arr[i]);
    }

    for(i=0;i<n;i++)
    {
        sum = sum + arr[i];
    }

    printf("\n%d", sum);

    
    return 0;
}