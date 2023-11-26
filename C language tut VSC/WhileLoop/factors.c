// C program to find the factors of the number using while loop

#include <stdio.h>
#include <stdlib.h>

int main() {
    int i;
    int n;
    printf("\nEnter any number : ");
    scanf("%d", &n); //n=1

    i = 2;
    while(i<=n/2) {
        if(n%i == 0) {
            printf("\n%d", i); //i = 2 5
        }
        i++; //i = 10 6 7 8 9
    }
    return 0;
}