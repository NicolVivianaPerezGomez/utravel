import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-frec-questions',
  imports: [RouterLink],
  templateUrl: './frec-questions.html',
  styleUrl: './frec-questions.css',
})
export class FrecQuestions implements OnInit {

  //lógica del scroll
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 100);
      }
    });
  }

  scrollToFragment(fragment: string, event: Event) {
    event.preventDefault();
    this.router
      .navigate([], {
        relativeTo: this.route,
        fragment: fragment,
      })
      .then(() => {
        this.viewportScroller.scrollToAnchor(fragment);
      });
  }
}
