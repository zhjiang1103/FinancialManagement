--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favorite; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.favorite (
    user_id integer,
    movie_id integer
);


ALTER TABLE public.favorite OWNER TO tpl1222_1;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    name character varying(255),
    api_id integer
);


ALTER TABLE public.movies OWNER TO tpl1222_1;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO tpl1222_1;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.users (
    id integer NOT NULL,
    lastname character varying(255),
    firstname character varying(255),
    email character varying(255)
);


ALTER TABLE public.users OWNER TO tpl1222_1;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO tpl1222_1;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.favorite (user_id, movie_id) FROM stdin;
1	1
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.movies (id, name, api_id) FROM stdin;
1	Saw X	951491
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.users (id, lastname, firstname, email) FROM stdin;
1	Wong	Steven	stevenWong@gmail.com
\.


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.movies_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: favorite favorite_movie_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id);


--
-- Name: favorite favorite_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

